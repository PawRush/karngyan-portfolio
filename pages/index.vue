<template>
  <div>
    <HeroSection/>
    <GithubCalendar v-if="$config.social.github"/>
    <Recommendations v-if="$config.recommendations.enabled"/>
    <LazyRecentBlog v-if="$config.blog.enabled && posts" :posts="posts"/>
  </div>
</template>

<script>
import HeroSection from '~/components/home/HeroSection.vue'
import GithubCalendar from '~/components/home/GithubCalendar.vue'
import Recommendations from '~/components/home/Recommendations.vue'
import RecentBlog from '~/components/home/RecentBlog.vue'

export default {
  components: {
    HeroSection,
    GithubCalendar,
    Recommendations,
    LazyRecentBlog: RecentBlog
  },
  head() {
    return {
      title: `home -- ${this.$config.name}`,
    }
  },
  data() {
    return {
      posts: null
    }
  },
  async created() {
    const fetchDocsLabel = 'fetchAllPosts'
    console.time(fetchDocsLabel)
    try {
      const posts = await this.$content('posts')
        .without(['body', 'toc', 'dir', 'extension', 'path', 'tags'])
        .limit(3)
        .skip(0)
        .sortBy('createdAt', 'desc')
        .fetch()
      this.posts = posts
    } catch (e) {
      console.error(e)
    } finally {
      console.timeEnd(fetchDocsLabel)
    }
  },
}
</script>

<style>
</style>
