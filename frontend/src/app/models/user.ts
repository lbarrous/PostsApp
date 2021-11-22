export type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
}

type Address = {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}

type Geo = {
    lat: string;
    lng: string;
}