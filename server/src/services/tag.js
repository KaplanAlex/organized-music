import Tag from "../models/Tag";

/**
 * Create a tag and associate it with the  user.
 *
 * Save the user after calling this function! Calling within can lead to
 * multiple saves which causes a mongodb error.
 */
export const createTag = (user, tag) => {
  const { tags } = user;

  // Handle duplicate user-tag names.
  const duplicates = tags.filter(userTag => userTag.value == tag.value);
  if (duplicates.length) {
    return { err: "Cannot have two tags with the same name." };
  }

  // Create the new tag
  const newTag = new Tag({
    value: tag.value,
    creator_id: user._id
  });
  newTag.save();

  tags.push(newTag);
  user.tags = tags;

  return { newTag, user };
};
