import {mutationWithClientMutationId} from "graphql-relay";
import {GraphQLNonNull, GraphQLString} from "graphql";
import * as FriendRequestService from "../../../../../persistence/service/FriendRequestService";
import {UserType} from "../../types/UserType";
import {User} from "../../../../../entities/User";
import * as Authenticator from "../../../../../services/Authenticator";
import {getLocalId} from "../../../../../persistence/util/IdParser";

export const cancelFriendRequestMutation = mutationWithClientMutationId(
    {
        name: 'CancelFriendRequest',
        inputFields: {
            token: {type: new GraphQLNonNull(GraphQLString)},
            userId: {type: new GraphQLNonNull(GraphQLString)}
        },
        outputFields: {
            sender: {type: UserType},
            receiver: {type: UserType}
        },
        mutateAndGetPayload: async({token, userId}) => {
            const sender = await Authenticator.getAndValidateUserByToken(token);
            const receiver = await User.getById(sender, getLocalId(userId));
            await FriendRequestService.cancelFriendRequestAwaitingReply(sender, receiver);

            return {
                receiver,
                sender
            };
        }
    });
