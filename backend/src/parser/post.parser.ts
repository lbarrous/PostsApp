import { Comment } from '../model/comment';
import { User, UserFromResponse } from '../model/user';

export const parseComment = (commentFromResponse: any): Comment => commentFromResponse as Comment;

export const parseUser = (
  userFromResponse: UserFromResponse | undefined,
): User | null => (
  userFromResponse
    ? {
      id: userFromResponse.id,
      name: userFromResponse.name,
      username: userFromResponse.username,
      email: userFromResponse.email,
      address: {
        street: userFromResponse.address.street,
        suite: userFromResponse.address.suite,
        city: userFromResponse.address.city,
        zipcode: userFromResponse.address.zipcode,
        geo: {
          lat: userFromResponse.address.geo.lat,
          lng: userFromResponse.address.geo.lng,
        },
      },
      phone: userFromResponse.phone,
      website: userFromResponse.website,
      company: {
        name: userFromResponse.company.name,
        catchPhrase: userFromResponse.company.catchPhrase,
        bs: userFromResponse.company.bs,
      },
    }
    : null
);
