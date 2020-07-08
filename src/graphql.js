import gql from 'graphql-tag';

/*=============================================m_ÔÔ_m=============================================\
    FORM CONFIG
\================================================================================================*/
export const GET_FORM_CONFIG = gql`
    query GetFormConfig($designId: Int!, $formConfigId: String!) {
        getFormConfig(designId: $designId, formConfigId: $formConfigId) {
            id
            method
            url
            data
            headers
        }
    }
`;

export const CREATE_FORM_CONFIG = gql`
    mutation CreateFormConfig($designId: Int!, $method: String!, $url: String!, $data: JSON!, $headers: JSON!) {
        createFormConfig(designId: $designId, method: $method, url: $url, data: $data, headers: $headers) {
            id
        }
    }
`;

export const UPDATE_FORM_CONFIG = gql`
    mutation UpdateFormConfig($designId: Int!, $formConfigId: String!, $method: String!, $url: String!, $data: JSON!, $headers: JSON!) {
        updateFormConfig(designId: $designId, formConfigId: $formConfigId, method: $method, url: $url, data: $data, headers: $headers) {
            id
        }
    }
`;

export const DELETE_FORM_CONFIG = gql`
    mutation DeleteFormConfig($designId: Int!, $formConfigId: String!) {
        deleteFormConfig(designId: $designId, formConfigId: $formConfigId) {
            success
        }
    }
`;