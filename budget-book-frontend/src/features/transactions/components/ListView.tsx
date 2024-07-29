import React from 'react';
import {CButton} from '@coreui/react';

interface ListViewProps {
    groupByCategory: boolean;
    setGroupByCategory: (groupByCategory: boolean) => void;
}

const ListView: React.FC<ListViewProps> = ({groupByCategory, setGroupByCategory}) => {
    return (
        <div className="list-view-toggle">
            {/* @ts-ignore */}
            <CButton
                color="primary"
                onClick={() => setGroupByCategory(!groupByCategory)}
            >
                Group by Category
            </CButton>
        </div>
    );
};

export default ListView;
