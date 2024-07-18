import React from 'react';
import {CButton, CButtonGroup} from '@coreui/react';
import CategoryTypeEnum from "../../../constants/categoryTypeEnum";
import useCategoryTypeFilter from "../hooks/useCategoryTypeFilter";

const CategoryTypeFilter = () => {
    const {selectedCategoryTypeFilter, changeCategoryTypeFilter} = useCategoryTypeFilter();

    return (
        <CButtonGroup>
            {Object.values(CategoryTypeEnum).map((filter) => (
                <CButton
                    key={filter}
                    color="primary"
                    variant="outline"
                    active={selectedCategoryTypeFilter?.toUpperCase() === filter.toUpperCase()}
                    onClick={() => changeCategoryTypeFilter(filter)}
                >
                    {filter}
                </CButton>
            ))}
        </CButtonGroup>
    );
};

export default CategoryTypeFilter;