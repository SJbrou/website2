import pluginRss from "@11ty/eleventy-plugin-rss";

export default function (eleventyConfig) {
  const isProd = process.env.ELEVENTY_ENV === "production";
  const pathPrefix = isProd ? "/website2" : "";

  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  eleventyConfig.addCollection("dev", (collectionApi) =>
    collectionApi.getFilteredByGlob("src/dev/**/*.md").reverse()
  );

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
