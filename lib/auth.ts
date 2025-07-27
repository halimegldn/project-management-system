
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "user",
                required: false,
            },
        },
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24, // 1 day
    },


});


// import { betterAuth } from "better-auth";
// import { prismaAdapter } from "better-auth/adapters/prisma";
// import { prisma } from "./prisma";

// export const auth = betterAuth({
//     database: prismaAdapter(prisma, {
//         provider: "postgresql",
//     }),
//     emailAndPassword: {
//         enabled: true,
//     },
//     user: {
//         additionalFields: {
//             role: {
//                 type: "string",
//                 defaultValue: "user",
//                 required: false,
//             },
//         },
//     },
//     session: {
//         expiresIn: 60 * 60 * 24 * 7, // 7 days
//         updateAge: 60 * 60 * 24, // 1 day
//     },
// })
