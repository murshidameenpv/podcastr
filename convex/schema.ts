import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// v.id('_storage'): an ID referencing a _storage table
export default defineSchema({
  podcasts: defineTable({
    user: v.id("users"),
    podcastTitle: v.string(),
    podcastDescription: v.string(),
    audioStorageId: v.optional(v.id(`_storage`)),
    audioUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id(`_storage`)),
    imageUrl: v.optional(v.string()),
    author: v.string(),
    authorId: v.string(),
    authorImageUrl: v.string(),
    voicePrompt: v.string(),
    imagePrompt: v.string(),
    voiceType: v.string(),
    audioDuration: v.number(),
    views: v.number(),
  }).searchIndex(`search_author`, { searchField: 'author' })
    .searchIndex(`search_title`, { searchField:'podcastTitle'})
    .searchIndex(`search_body`,{searchField:'podcastDescription'}),
  users: defineTable({
    email: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    name: v.string(),
  }),
});

//Documentation about 'v'
// In Convex, v.union and v.optional are two different ways to define a column's type in a schema. Let's break down the differences:
// v.union:
// v.union defines a column that can hold one of multiple types. In your first example, audioStorageId is defined as a union of two types:
// v.id('_storage'): an ID referencing a _storage table
// v.null(): a null value
// This means that audioStorageId can either be an ID referencing a _storage table or a null value.
// v.optional:
// v.optional defines a column that can hold a value of a specific type, or be null. In your second example, audioStorageId is defined as an optional ID referencing a _storage table:
// v.optional(v.id('_storage')): an ID referencing a _storage table, or null
// This means that audioStorageId can either be an ID referencing a _storage table or null.
// Key differences:
// v.union allows for multiple types, while v.optional only allows for a single type or null.
// v.union is more flexible, but can lead to more complex data models. v.optional is more restrictive, but easier to work with.
// Which one to use?
// In your case, if audioStorageId can only be either an ID referencing a _storage table or null, then v.optional is a better fit. It's more concise and easier to understand.
// If, however, audioStorageId can hold multiple types (e.g., an ID, a string, or null), then v.union is a better choice.
// So, in this case, I would recommend using the second example with v.optional:
