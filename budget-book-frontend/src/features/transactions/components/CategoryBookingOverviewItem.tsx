import React from 'react';
import {CategoryBookingOverview} from "../../../types/categoryBookingOverview";
import {mapIcon} from "../../../utils/mapIcon";
import './CategoryBookingOverviewItem.scss';

interface CategoryBookingOverviewProps {
    overview: CategoryBookingOverview;
}

const CategoryBookingOverviewItem: React.FC<CategoryBookingOverviewProps> = ({overview}) => {
    const IconComponent = mapIcon(overview.category.iconName);
    const isChildCategory = !!overview.category.parentId;

    return (
        <>
            <li className={`category-item ${isChildCategory ? 'child-category' : ''}`}>
                {IconComponent && (
                    <IconComponent
                        className="icon"
                        style={{color: overview.category.colorCode}}
                    />
                )}
                <span className="category-name">{overview.category.name}</span>
                <span className="percentage">{overview.percentage.toFixed(1)}%</span>
                <span className="amount">{overview.amount.toFixed(2)}</span>
            </li>
            {overview.children && overview.children.length > 0 && (
                <ul className="child-list">
                    {overview.children.map((childOverview, index) => (
                        <CategoryBookingOverviewItem key={index} overview={childOverview}/>
                    ))}
                </ul>
            )}
        </>
    );
};

export default CategoryBookingOverviewItem;
