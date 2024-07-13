package com.gmainer.budgetbook.testdata.service

import com.gmainer.budgetbook.category.model.Category
import com.gmainer.budgetbook.category.model.CategoryType
import com.gmainer.budgetbook.category.repository.CategoryColorRepository
import com.gmainer.budgetbook.category.repository.CategoryIconRepository
import com.gmainer.budgetbook.category.repository.CategoryRepository
import jakarta.transaction.Transactional
import org.springframework.stereotype.Service

@Service
class TestDataCategoryService(
    private val categoryRepository: CategoryRepository,
    private val categoryColorRepository: CategoryColorRepository,
    private val categoryIconRepository: CategoryIconRepository
) {

    @Transactional
    fun insertTestCategories(): String {
        val categories = mutableListOf<Category>()
        categories.addAll(insertTestParentCategories())
        categories.addAll(insertTestChildrenCategories())
        return "Inserted ${categories.size} rows into categories table"
    }

    @Transactional
    fun insertTestParentCategories(): List<Category> {
        val categories = mutableListOf<Category>()
        categories.add(create("Salary", CategoryType.INCOME, "food", "green"))
        categories.add(create("Child Benefit", CategoryType.INCOME, "home", "blue"))

        categories.add(create("Food", CategoryType.OUTCOME, "food", "pink"))
        categories.add(create("Housing", CategoryType.OUTCOME, "home", "blue"))
        categories.add(create("Personal", CategoryType.OUTCOME, "school", "orange"))
        categories.add(create("Transport", CategoryType.OUTCOME, "car", "yellow"))
        categories.add(create("Gift", CategoryType.OUTCOME, "gift", "pink"))
        categories.add(create("Other", CategoryType.OUTCOME, "dots", "gray"))

        categoryRepository.saveAll(categories)

        return categories
    }

    @Transactional
    fun insertTestChildrenCategories(): List<Category> {
        val cs = mutableListOf<Category>()

        cs.add(create("Groceries", CategoryType.OUTCOME, "food", "orange", "Food"))
        cs.add(create("Enjoyment", CategoryType.OUTCOME, "music", "purple", "Food"))
        cs.add(create("Eating Out", CategoryType.OUTCOME, "food", "peach", "Food"))
        cs.add(create("Alcohol", CategoryType.OUTCOME, "water", "cyan", "Food"))

        cs.add(create("Rent", CategoryType.OUTCOME, "home", "red", "Housing"))
        cs.add(create("Home Services", CategoryType.OUTCOME, "medical-bag", "lime_green", "Housing"))
        cs.add(create("Furniture", CategoryType.OUTCOME, "shopping", "purple", "Housing"))
        cs.add(create("Pet", CategoryType.OUTCOME, "umbrella", "orange", "Housing"))
        cs.add(create("Household", CategoryType.OUTCOME, "lightbulb-outline", "blue", "Housing"))

        cs.add(create("Daiku", CategoryType.OUTCOME, "briefcase", "red", "Personal"))
        cs.add(create("Sport", CategoryType.OUTCOME, "basketball", "lime_green", "Personal"))
        cs.add(create("Investment", CategoryType.OUTCOME, "ticket-account", "cyan", "Personal"))
        cs.add(create("Entertainment", CategoryType.OUTCOME, "movie", "pink", "Personal"))
        cs.add(create("Hygiene", CategoryType.OUTCOME, "medical-bag", "gray", "Personal"))
        cs.add(create("Cloth", CategoryType.OUTCOME, "t-shirt-crew-outline", "purple", "Personal"))

        cs.add(create("Car", CategoryType.OUTCOME, "car", "yellow", "Transport"))
        cs.add(create("Public Transit", CategoryType.OUTCOME, "train", "teal", "Transport"))

        categoryRepository.saveAll(cs)

        return cs
    }

    private fun create(
        name: String,
        type: CategoryType,
        iconName: String,
        colorName: String,
        parentName: String? = null
    ): Category {
        val icon =
            categoryIconRepository.findByName(iconName) ?: throw IllegalArgumentException("CategoryIcon not found")
        val color =
            categoryColorRepository.findByName(colorName) ?: throw IllegalArgumentException("CategoryColor not found")
        val parent: Category? = parentName?.let { categoryRepository.findByName(it) }

        return Category(
            name = name,
            categoryType = type,
            icon = icon,
            color = color,
            parent = parent
        )
    }
}
