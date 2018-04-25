export interface Link {
    name: string;
    link: string;
    children?: Link[];
}

const accountLink: Link = {
    name: 'account management',
    link: '/account'
};

const userDashboardLink: Link = {
    name: 'User dashboard',
    link: '/userDashboard'
};

export const helpGuideLinks: Link[] = [
    accountLink,
    userDashboardLink
];
