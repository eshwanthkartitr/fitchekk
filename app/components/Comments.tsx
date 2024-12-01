import { DiscussionEmbed } from 'disqus-react';

const Comments = ({ itemId, title }: { itemId: string, title: string }) => {
  return (
    <DiscussionEmbed
      shortname="your-disqus-shortname"
      config={{
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/wardrobe/${itemId}`,
        identifier: itemId,
        title: title
      }}
    />
  );
}; 