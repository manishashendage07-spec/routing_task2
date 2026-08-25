
export interface Iusers {
    userName: string;
    userId: string;
    userRole: 'buyer' | 'Admin' | 'superadmin';
    profileDescription: string;
    profileImage: string;
    skills: string[];
    experienceYears: string;
    isActive: boolean;
    address: {
        current: {
            city: string;
            state: string;
            country: string;
            zipcode: string;
        };
        permanent: {
            city: string;
            state: string;
            country: string;
            zipcode: string;
        };
    };
    isAddSame: boolean;
}

export interface IresUsers<T> {
    msg: string;
    data: T;
}