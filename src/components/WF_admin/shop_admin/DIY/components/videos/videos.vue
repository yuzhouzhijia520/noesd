<template>
    <div class="wf-DIY-video" >
        <video-player   class="video-player vjs-custom-skin"
            ref="videoPlayer"
            :options="playerOptions"
            :playsinline="true"
            customEventName="customstatechangedeventname"

            @play="onPlayerPlay($event)"
            @ended="onPlayerEnded($event)"
            @waiting="onPlayerWaiting($event)"
            @playing="onPlayerPlaying($event)"
            @loadeddata="onPlayerLoadeddata($event)"
            @timeupdate="onPlayerTimeupdate($event)"
            @canplay="onPlayerCanplay($event)"
            @canplaythrough="onPlayerCanplaythrough($event)"

            @statechanged="playerStateChanged($event)"
            @ready="playerReadied">
        </video-player>
    </div>
</template>

<script>
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'

import { videoPlayer } from 'vue-video-player'
import 'videojs-flash'
import 'videojs-contrib-hls.js/src/videojs.hlsjs'

export default {
    name: '',
    props:{
        comProps:Array,
    },
    data() {
        return {
            newComProps:{},
            playerOptions: {
                autoplay: false, 
                muted: true,
                language: 'zh-CN',
                aspectRatio: '16:9',
                playbackRates: [0.7, 1.0, 1.5, 2.0],
                sources: [
                    {
                      type: "",
                      src: ""
                    }
                  // {
                  //   type: "application/x-mpegurl",
                  //   src: "https://56.com-t-56.com/20190421/14937_48f8e64f/index.m3u8"
                  // }
                  // {
                  //   type: "video/mp4",
                  //   src:"https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
                  // },
                  // {
                  //   type: "video/mp4",
                  //   src:"http://www.17sucai.com/preview/501914/2017-08-04/%E9%A1%B5%E9%9D%A2/media/mov_bbb.mp4"
                  // }
                ],
                poster: "",
                notSupportedMessage:'此视频暂时无法播放,请稍后再试!', //允许覆盖Video.js无法播放媒体源时显示的默认消息
            }
      }
    },
    computed: {
      player() {
        if(this.$refs.videoPlayer){
          if(this.$refs.videoPlayer.player){
            return this.$refs.videoPlayer.player
          }
        }
      }
    },
    components: {
        videoPlayer
    },
    mounted() {
      
    },
    methods: {
      // listen event
      onPlayerPlay(player) {
      },
      onPlayerEnded(player){
      },
      onPlayerWaiting(player){
      },
      onPlayerPlaying(player){
      },
      onPlayerLoadeddata(player){
      },
      onPlayerTimeupdate(player){
      },
      playerStateChanged(playerCurrentState) {
      },
      onPlayerCanplay(player){
      },
      onPlayerCanplaythrough(player){
      },
      playerReadied(player) {
      }
    },
    watch:{
        comProps:{
            immediate:true,//初始值执行handler的函数
            handler(val,oldVal){
              // if(this.$refs.videoPlayer){
              //   this.$refs.videoPlayer.player.src(this.newComProps[0].item.videosrc)
              // }
              this.newComProps=JSON.parse(JSON.stringify(this.comProps));
              this.playerOptions.poster=this.newComProps[0].item.imgsrc;
              this.playerOptions.autoplay=this.newComProps[0].item.autoplay;
              this.playerOptions.sources[0].src=this.newComProps[0].item.videosrc;
              this.playerOptions.sources[0].type=this.newComProps[0].item.type;
            }
        }
    },
    destroyed(){
      if(this.$refs.videoPlayer){
        if(this.$refs.videoPlayer.player){
          this.$refs.videoPlayer.player.pause();
        }
      }
    }
}
</script>


<style lang="scss" scoped>
.wf-DIY-video{
    min-height: 0 !important;
    border-left: 1px solid rgb(237, 237, 237);
    border-right: 1px solid rgb(237, 237, 237);
    /deep/ .vjs-custom-skin > .video-js .vjs-big-play-button{
      font-size: 25px;
      border-radius: 25px;
      width: 2em;
      margin-left: -1em !important;
    }
}
</style>