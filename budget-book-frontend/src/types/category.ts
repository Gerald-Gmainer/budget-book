export interface Category {
    id: number;
    name: string;
    iconName: string;
    colorCode: string;
    type: 'INCOME' | 'OUTCOME';
    parentId: number | null;
    parentName: string | null;
}