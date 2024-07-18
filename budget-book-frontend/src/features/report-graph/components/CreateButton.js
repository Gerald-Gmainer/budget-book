import React from 'react';
import {CButton} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {cilPlus} from '@coreui/icons';

const CreateButton = ({className}) => {
    const onClick = () => {
        console.log('Create button clicked')
    }

    return (
        <CButton color="primary" onClick={onClick} className={className}>
            <CIcon icon={cilPlus} style={{marginRight: '5px'}}/>
            Create
        </CButton>
    );
};

export default CreateButton;