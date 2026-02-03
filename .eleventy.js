import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import pluginRss from "@11ty/eleventy-plugin-rss";

export default function (eleventyConfig) {
  const isProd = process.env.ELEVENTY_ENV === "production";
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
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

  return {
    pathPrefix: isProd ? "/website2/" : "/",
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
