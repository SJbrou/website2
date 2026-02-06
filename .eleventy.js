import pluginRss from "@11ty/eleventy-plugin-rss";

export default function (eleventyConfig) {
  const isProd = process.env.ELEVENTY_ENV === "production";
  const pathPrefix = isProd ? "/website2" : "";

  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  eleventyConfig.addCollection("dev", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/dev/**/*.md").reverse()
  );

  eleventyConfig.addCollection("devByTag", (collectionApi) => {
    const posts = collectionApi.getFilteredByGlob("src/dev/**/*.md");
    const tagMap = {};
    const allTags = new Set();

    // Collect all tags and posts
    posts.forEach(post => {
      const tags = post.data.tags || [];
      tags.forEach(tag => {
        if (tag !== "dev") { // Exclude generic "dev" tag
          allTags.add(tag);
          if (!tagMap[tag]) {
            tagMap[tag] = [];
          }
          tagMap[tag].push(post);
        }
      });
    });

    // Sort posts by date within each tag
    Object.keys(tagMap).forEach(tag => {
      tagMap[tag].sort((a, b) => new Date(b.date) - new Date(a.date));
    });

    // Return as array of {tag, posts} for easier iteration
    return Array.from(allTags)
      .sort()
      .map(tag => ({
        tag,
        posts: tagMap[tag]
      }));
  });

  eleventyConfig.addCollection("about", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/about/**/*.md").reverse()
  );

  eleventyConfig.addCollection("links", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/links/**/*.md").reverse()
  );

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    const date = new Date(dateObj);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(date);
  });

  eleventyConfig.addFilter("capitalize", (str) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  });

  eleventyConfig.addFilter("absoluteUrl", (url) => {
    if (url.startsWith("/")) {
      return url.slice(1);
    }
    return url;
  });

  // Add a proper url filter that respects pathPrefix
  eleventyConfig.addNunjucksGlobal("pathPrefix", pathPrefix);
  eleventyConfig.addFilter("url", function(url) {
    if (!url) return url;
    if (url === "/") return pathPrefix + "/";
    // Remove leading slash if present, then add pathPrefix
    const cleanUrl = url.startsWith("/") ? url.slice(1) : url;
    return pathPrefix + "/" + cleanUrl;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes/layouts",
      data: "_data",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
