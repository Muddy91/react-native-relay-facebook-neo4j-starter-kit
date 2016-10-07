import {Entity} from "./Entity";

export type AnimalKindType = "cat" | "dog";

export class Animal extends Entity {

    fullName: ?string;
    nickName: ?string;
    animalKind: "dog" | "cat";
    profilePhotoUrl: ?string;
    birthDate: ?Date;
    deathDate: ?Date;
    litterId: ?string;
    deceased: ?boolean;


    constructor(id: string,
                createdAt: Date = new Date(),
                modifiedAt: Date = new Date(),
                deleted: boolean = false,
                deletedAt: ?Date = undefined,
                fullName: string,
                nickName: string,
                animalKind: *,
                profilePhotoUrl: string,
                birthDate: Date,
                deathDate: Date,
                litterId: string,
                deceased: boolean) {
        super(id, createdAt, modifiedAt, deleted, deletedAt);
        this.fullName = fullName;
        this.nickName = nickName;
        this.animalKind = animalKind;
        this.profilePhotoUrl = profilePhotoUrl;
        this.birthDate = birthDate;
        this.deathDate = deathDate;
        this.litterId = litterId;
        this.deceased = deceased;
    }

    static createFromEntity(entity: ?Object): Animal {
        if (!entity) {
            throw "Animal.createFromEntity() got undefined entity as argument.";
        }
        return new Animal(
            entity.properties.id,
            new Date(entity.properties.createdAt),
            new Date(entity.properties.modifiedAt),
            Boolean(entity.properties.deleted),
            new Date(entity.properties.deletedAt),

            entity.properties.fullName,
            entity.properties.nickName,
            entity.properties.animalKind,
            entity.properties.profilePhotoUrl,
            entity.properties.birthDate,
            entity.properties.deathDate,
            entity.properties.litterId,
            Boolean(entity.properties.deceased)
        );
    }

}

export const mockedAnimal = new Animal("id123",
    undefined,
    undefined,
    undefined,
    undefined,
    "Soya Upswing",
    "Soya",
    "dog",
    "",
    new Date(),
    new Date(),
    "litterId123",
    false
);