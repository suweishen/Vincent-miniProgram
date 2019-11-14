    <template>
      <div class="tag-group-wrapper" v-if="value.length > 0">
        <div class="tag-group-header">
          <div class="header-text">{{headerText}}</div>
          <div class="header-btn" @click="onBtnClick">{{btnText}}</div>
        </div>
        <div class="tag-group">
          <div
            class="tag-group-inner"
            v-for="(text, index) in value"
            :key="index"
          >
            <div class="tag-wrapper" @click="onTagClick(text)">
              <div class="tag">{{text}}</div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <script>
      import Tag from '@/components/Tag'

      export default {
        components: {
          Tag
        },
        props: {
          headerText: String,
          btnText: String,
          value: Array
        },
        methods: {
          onTagClick(text) {
            this.$emit('onTagClick', text)
          },
          onBtnClick() {
            console.log('on btn click...')
            this.value = []
            this.$emit('onBtnClick')
          }
        }
      }
    </script>

    <style lang="less">
      .tag-group-wrapper {
        padding: 30rpx 0 0;

        .tag-group-header {
          display: flex;
          justify-content: space-between;
          font-size: 28rpx;
          padding: 0 30rpx;

          .header-text {
            color: #333;
          }

          .header-btn {
            color: #3696EF;
          }
        }

        .tag-group {
          display: flex;
          flex-flow: row wrap;
          padding: 15rpx;
          .tag-group-inner {
            padding: 15rpx;
            max-width: 100%;
            box-sizing: border-box;
            .tag-wrapper {
              display: flex;
              justify-content: center;
              border-radius: 50px;
              background: #F7F7F9;
              color: #272E37;
              padding: 8rpx 30rpx;
              font-size: 28rpx;
              .tag {
                width: 100%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
          }
        }
      }
    </style>

