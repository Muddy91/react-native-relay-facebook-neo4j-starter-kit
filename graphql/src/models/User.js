/* @flow */
import {
    getUserByEmail,
    getAllUsersWithCompleteProfile,
    getUserByUuid,
    getAllUsers,
    updateUser
} from "../persistence/service/UserService";
import {toGlobalId} from "graphql-relay";

export class User {

    id: string;
    token: string;
    firstName: ?string;
    lastName: ?string;
    email: ?string;
    profilePhotoUrl: ?string;
    completeProfile: boolean;
    isSuperUser: boolean;

    constructor(id: string,
                token: string,
                firstName: ?string,
                lastName: ?string,
                email: ?string,
                profilePhotoUrl: ?string,
                isSuperUser: boolean = false) {
        this.id = id;
        this.token = token;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.profilePhotoUrl = profilePhotoUrl;
        this.isSuperUser = isSuperUser;
    }

    isCompleteProfile() {
        return Boolean(this.firstName && this.lastName && this.email);
    }

    static createFromEntity(entity: Object): User {
        return new User(toGlobalId("User", entity.properties.uuid),
            entity.properties.token,
            entity.properties.firstName,
            entity.properties.lastName,
            entity.properties.email,
            entity.properties.profilePhotoUrl,
            Boolean(entity.properties.isSuperUser)
        );
    }

    static async getByEmail(viewer: User, email: string): Promise<?User> {
        const user = await getUserByEmail(email);
        if (user == null) return null;
        return user;
    }

    static async getById(viewer: User, id: string): Promise<?User> {
        const user = await getUserByUuid(id);
        if (user == null) return null;
        return user;
    }

    static async getAll(viewer): Promise<Array<User>> {
        console.log("getAll");

        const users = await getAllUsers();
        if (users == null) return [];
        return users
    }

    static async getAllWithCompleteProfile(viewer: User): Promise<Array<User>> {
        console.log("getAllWithCompleteProfile");

        const users = await getAllUsersWithCompleteProfile();
        if (users == null) return [];
        return users
    }

    static async updateUser(viewer: User, user: User) {
        if (viewer.id === user.id || viewer.isSuperUser) {
            return await updateUser(user);
        } else {
            throw "Updating other user is not allowed.";
        }

    }

    static isEntityCompleteProfile(entity) {
        return Boolean(entity.properties.firstName && entity.properties.lastName && entity.properties.email);
    }

}

export const userMock = new User("", "");