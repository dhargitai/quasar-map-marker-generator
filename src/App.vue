<template>
  <q-layout id="q-app" view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>
          Map Marker Generator
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
        <q-list no-border link inset-delimiter>
          <q-list-header>About author</q-list-header>
          <q-item @click.native="openURL('https://www.linkedin.com/in/hargitai/')">
            <q-item-side avatar="statics/david-hargitai-mobile-app-developer.jpeg" />
            <q-item-main label="David Hargitai" sublabel="Full-stack JS & Flutter Mobile App Developer"></q-item-main>
          </q-item>
          <q-item @click.native="openURL('mailto:david.hargitai+fromportfolio@gmail.com')">
            <q-item-main label="If you need help in your next web app or mobile development project, don't hesitate to contact me (just click here)."></q-item-main>
          </q-item>
        </q-list>

      <q-list no-border link inset-delimiter>
        <q-list-header>This project is proudly built using these awesome tools:</q-list-header>
        <q-item @click.native="openURL('https://vuejs.org/')">
          <q-item-main label="Vue.js"></q-item-main>
        </q-item>
        <q-item @click.native="openURL('https://quasar-framework.org/')">
          <q-item-main label="Quasar Framework"></q-item-main>
        </q-item>
        <q-item @click.native="openURL('http://html2canvas.hertzen.com/')">
          <q-item-main label="HTML 2 Canvas"></q-item-main>
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container class="flex justify-center">

      <div class="column">

        <div class="row items-center justify-center" id="icons">
          <template v-for="(iconData, index) in iconsData">

            <div class="icon-container col" :key="`icon-${index}-${iconCommonKeyComponent}`">
              <div class="row justify-end">
                <q-btn round color="negative" dense class="self-end" icon="remove" @click="iconsData.splice(index, 1)" />
              </div>

              <div class="assembled-icon" :id="idForOriginal(index)">
                <svg class="marker filled self-center"
                     :style="{ width: `${markerWidthPx}px`, height: `${markerHeightPx}px` }"
                     role="presentation" focusable="false" version="1.0" xmlns="http://www.w3.org/2000/svg" width="1209.333" height="1706.667" viewBox="0 0 907 1280">
                  <defs>
                    <path
                      :id="`marker-path-${index}`"
                      :style="{ fill: iconData.backgroundColor }"
                      d="M424.5.6C240.6 12.5 94.9 107 33.2 254.5c-15.1 36-25.1 75-30.3 118.6-3 24.4-3.2 68.6-.5 91.4C12.2 548 42.1 638.1 96.6 748c60.4 122 144.2 253.9 254 400 31.9 42.5 101.1 130.7 102.6 130.9 1.4.2 67.6-83.8 102.1-129.7 240.6-319.8 363.3-583.4 350.8-753.7-8-109.1-47-197.1-118.2-267.2C716.2 57.7 619.1 14.5 505 2.4 491.2 1 437.6-.2 424.5.6z"></path>
                    <clipPath :id="`clip-${index}`">
                      <use :xlink:href="`#marker-path-${index}`"/>
                    </clipPath>
                  </defs>
                  <g>
                    <use :xlink:href="`#marker-path-${index}`" stroke="#000000" stroke-width="5%" fill="#00D2B8" :clip-path="`url(#clip-${index})`"/>
                  </g>
                </svg>

                <img :src="iconData.icon" alt="" style="width: 25%;" class="self-center"
                     :style="{ width: `${markerWidthPx * miniIconRatio}px`, 'max-height': `${markerWidthPx * miniIconRatio}px` }">

                <div class="label text-center self-center" v-if="iconData.label" :style="{ 'background-color': iconData.backgroundColor, 'font-size': `${(iconData.labelSize ? (iconData.labelSize / 10) : 1)}em`, color: iconData.labelColor }">{{ iconData.label }}</div>
              </div>
              <q-checkbox v-model="iconData.needOriginal" label="Need this (original)" />

              <div class="assembled-icon medium" :id="idForMedium(index)">
                <svg class="marker filled self-center"
                     :style="{ width: `${markerWidthPx}px`, height: `${markerHeightPx}px` }"
                     role="presentation" focusable="false" version="1.0" xmlns="http://www.w3.org/2000/svg" width="1209.333" height="1706.667" viewBox="0 0 907 1280">
                  <defs>
                    <path
                      :id="`marker-path-${index}-md`"
                      :style="{ fill: iconData.backgroundColor }"
                      d="M424.5.6C240.6 12.5 94.9 107 33.2 254.5c-15.1 36-25.1 75-30.3 118.6-3 24.4-3.2 68.6-.5 91.4C12.2 548 42.1 638.1 96.6 748c60.4 122 144.2 253.9 254 400 31.9 42.5 101.1 130.7 102.6 130.9 1.4.2 67.6-83.8 102.1-129.7 240.6-319.8 363.3-583.4 350.8-753.7-8-109.1-47-197.1-118.2-267.2C716.2 57.7 619.1 14.5 505 2.4 491.2 1 437.6-.2 424.5.6z"></path>
                    <clipPath :id="`clip-${index}-md`">
                      <use :xlink:href="`#marker-path-${index}-md`"/>
                    </clipPath>
                  </defs>
                  <g>
                    <use :xlink:href="`#marker-path-${index}-md`" stroke="#000000" stroke-width="5%" fill="#00D2B8" :clip-path="`url(#clip-${index}-md)`"/>
                  </g>
                </svg>

                <img :src="iconData.icon" alt="" style="width: 25%;" class="self-center"
                     :style="{ width: `${markerWidthPx * miniIconRatio}px`, 'max-height': `${markerWidthPx * miniIconRatio}px` }">

                <div class="label text-center self-center" v-if="iconData.label" :style="{ 'background-color': iconData.backgroundColor, 'font-size': `${(iconData.labelSize ? (iconData.labelSize / 10) : 1) }em`, color: iconData.labelColor }">{{ iconData.label }}</div>
              </div>
              <q-checkbox v-model="iconData.needMedium" label="Need this (medium)" />

              <div class="assembled-icon small" :id="idForSmall(index)">
                <svg class="marker filled self-center"
                     :style="{ width: `${markerWidthPx}px`, height: `${markerHeightPx}px` }"
                     role="presentation" focusable="false" version="1.0" xmlns="http://www.w3.org/2000/svg" width="1209.333" height="1706.667" viewBox="0 0 907 1280">
                  <defs>
                    <path
                      :id="`marker-path-${index}-sm`"
                      :style="{ fill: iconData.backgroundColor }"
                      d="M424.5.6C240.6 12.5 94.9 107 33.2 254.5c-15.1 36-25.1 75-30.3 118.6-3 24.4-3.2 68.6-.5 91.4C12.2 548 42.1 638.1 96.6 748c60.4 122 144.2 253.9 254 400 31.9 42.5 101.1 130.7 102.6 130.9 1.4.2 67.6-83.8 102.1-129.7 240.6-319.8 363.3-583.4 350.8-753.7-8-109.1-47-197.1-118.2-267.2C716.2 57.7 619.1 14.5 505 2.4 491.2 1 437.6-.2 424.5.6z"></path>
                    <clipPath :id="`clip-${index}-sm`">
                      <use :xlink:href="`#marker-path-${index}-sm`"/>
                    </clipPath>
                  </defs>
                  <g>
                    <use :xlink:href="`#marker-path-${index}-sm`" stroke="#000000" stroke-width="5%" fill="#00D2B8" :clip-path="`url(#clip-${index}-sm)`"/>
                  </g>
                </svg>

                <img :src="iconData.icon" alt="" style="width: 25%;" class="self-center"
                     :style="{ width: `${markerWidthPx * miniIconRatio}px`, 'max-height': `${markerWidthPx * miniIconRatio}px` }">

                <div class="label text-center self-center" v-if="iconData.label" :style="{ 'background-color': iconData.backgroundColor, 'font-size': `${(iconData.labelSize ? (iconData.labelSize / 10) : 1)}em`, color: iconData.labelColor }">{{ iconData.label }}</div>
              </div>
              <q-checkbox v-model="iconData.needSmall" label="Need this (small)" />

              <q-input v-model="iconData.label" value float-label="Label"></q-input>
              <q-color v-model="iconData.labelColor" format-model="hex" float-label="Label color" />
              <p class="caption">
                Label size
              </p>
              <q-slider v-model="iconData.labelSize" :min="8" :max="13" />
              <q-input v-model="iconData.icon" value float-label="Icon URL"></q-input>
              <q-color v-model="iconData.backgroundColor" format-model="hex" float-label="Background color" />
              <q-input v-model="iconData.name" value float-label="File name"></q-input>

              <div class="row justify-center q-mt-md">
                <q-btn label="Generate" @click="generateOnly(index)" color="primary" class="" size="md" />
              </div>
            </div>

          </template>

          <div class="icon-container items-center justify-center flex" id="add-button-container">
            <q-btn round color="positive" size="xl" icon="add" @click="add" />
          </div>
        </div>

        <div class="row justify-center">
          <q-list>
            <q-collapsible icon="save" label="Save your configuration here">
              <div>
                <q-input
                  v-model="iconsDataAsString"
                  type="textarea"
                  float-label="Save this to export"
                  :max-height="100"
                  readonly
                  rows="7"
                />
              </div>
            </q-collapsible>
            <q-collapsible icon="call_received" label="Or import it here">
              <div>
                <q-input
                  v-model="dataToImport"
                  :key="dataToImportKey"
                  type="textarea"
                  float-label="Paste here to import"
                  :max-height="100"
                  rows="7"
                />
              </div>
            </q-collapsible>
          </q-list>
        </div>

      </div>

      <q-btn label="Generate all" @click="generateAll" color="primary" class="fixed" size="xl" style="right: 18px; bottom: 18px" />

      <q-inner-loading :visible="isLoading">
        <q-spinner-gears size="100px" color="primary"></q-spinner-gears>
      </q-inner-loading>

    </q-page-container>
  </q-layout>
</template>

<script>
import {
  openURL,
  QInput,
  QColor,
  QSlider,
  QCollapsible,
  QCheckbox,
  QInnerLoading,
  QSpinnerGears,
  // Loading,
  uid,
} from 'quasar'
import iconsData from './components/icons-data'
import IconGenerator from './components/icon-generator'

export default {
  name: 'LayoutDefault',

  components: {
    QInput,
    QColor,
    QSlider,
    QCollapsible,
    QCheckbox,
    QInnerLoading,
    QSpinnerGears,
  },

  mixins: [
    IconGenerator
  ],

  data () {
    return {
      leftDrawerOpen: false,
      iconsData,
      markerWidthPx: 70,
      miniIconRatio: .6,
      dataToImport: '',
      dataToImportKey: uid(),
      iconCommonKeyComponent: uid(),
      isLoading: false,
    }
  },

  computed: {
    markerHeightPx() {
      return this.markerWidthPx / 1134 * 1600;
    },

    iconsDataAsString() {
        return JSON.stringify(this.iconsData);
    },
  },

  methods: {
    openURL,

    add() {
      const vm = this;
      vm.iconsData.push({
        "name": `marker-${uid()}`,
        "icon": "",
        "label": "...",
        "labelSize": 10,
        "labelColor": "#000000",
        "backgroundColor": "#ffffff",
        "needOriginal": true,
        "needMedium": true,
        "needSmall": true,
      });
    },

    importData(newData = null) {
      if (newData) {
        const vm = this;
        vm.$set(vm, 'iconsData', JSON.parse(newData));
        setTimeout(() => {
          vm.dataToImport = '';
          vm.dataToImportKey = uid();
        }, 200);
      }
    },

    idForOriginal(index) {
      return `assembled-icon-${index}`;
    },

    idForMedium(index) {
      return `assembled-icon-${index}-md`;
    },

    idForSmall(index) {
      return `assembled-icon-${index}-sm`;
    },

    async generateOnly(index) {
      const vm = this;
      const iconsToGenerate = [];

      if (vm.iconsData[index].needOriginal) {
        const data = JSON.parse(JSON.stringify(vm.iconsData[index]));
        data.id = this.idForOriginal(index);
        iconsToGenerate.push(data);
      }

      if (vm.iconsData[index].needMedium) {
        const data = JSON.parse(JSON.stringify(vm.iconsData[index]));
        data.id = this.idForMedium(index);
        data.name = `${data.name}-md`;
        iconsToGenerate.push(data);
      }

      if (vm.iconsData[index].needSmall) {
        const data = JSON.parse(JSON.stringify(vm.iconsData[index]));
        data.id = this.idForSmall(index);
        data.name = `${data.name}-sm`;
        iconsToGenerate.push(data);
      }

      this.generate(iconsToGenerate);
    },

    async generateAll() {
      const vm = this;
      const iconsToGenerate = [];

      vm.iconsData.forEach((iconData, index) => {
        if (vm.iconsData[index].needOriginal) {
          const data = JSON.parse(JSON.stringify(vm.iconsData[index]));
          data.id = this.idForOriginal(index);
          iconsToGenerate.push(data);
        }

        if (vm.iconsData[index].needMedium) {
          const data = JSON.parse(JSON.stringify(vm.iconsData[index]));
          data.id = this.idForMedium(index);
          data.name = `${data.name}-md`;
          iconsToGenerate.push(data);
        }

        if (vm.iconsData[index].needSmall) {
          const data = JSON.parse(JSON.stringify(vm.iconsData[index]));
          data.id = this.idForSmall(index);
          data.name = `${data.name}-sm`;
          iconsToGenerate.push(data);
        }
      });

      this.generate(iconsToGenerate);
    },
  },

  watch: {
    dataToImport: {
      handler: 'importData',
      immediate: true,
    },
  },
}
</script>


<style lang="stylus">
  @import '~variables'

  $assembled-icon-width = 320
  $icon-container-padding = 15

  .q-layout, .q-layout-page-container
    padding-top 0 !important

  .q-inner-loading
    height 100vh
    z-index 3
    position fixed !important

  .q-if-label
    color black !important

  .caption
    color black !important
    font-weight normal !important
    margin-top 16px
    margin-bottom 0

  #icons
    max-width ($assembled-icon-width * 3 + 100)px

  .icon-container
    background #ebebeb
    margin 15px
    padding ($icon-container-padding)px
    border 2px solid dodgerblue
    min-width ($assembled-icon-width)px !important

  #add-button-container
    min-height ($assembled-icon-width)px !important
    min-width ($assembled-icon-width)px !important

  .assembled-icon
    position relative
    font-size 1em
    display flex
    align-items center
    justify-content center
    flex-direction column
    min-width ($assembled-icon-width - 2 * $icon-container-padding)px

    .circle
      -webkit-border-radius: 100px;
      -moz-border-radius: 100px;
      border-radius: 100px;
      border 5px solid black
      padding 10px

    .label
      font-weight bold
      border 2px solid black
      padding 3px 10px
      max-width ($assembled-icon-width - 4)px
      position absolute
      bottom 10%
      z-index 2

    img
      position absolute
      top 10%
      z-index 2

    .marker
      z-index 1

  .holder
    position absolute
    left -9999em

  .q-layout {
    padding 2em 0 6em 0
  }

  .q-list
    background #ebebeb
    border 2px solid #979797 !important

  .q-collapsible-closed
    border-bottom 1px solid #7f7f7f !important

  .q-item-division:last-child
    border-bottom none !important

  .toPrint
    background-color transparent
    border none
    min-width auto

  .q-input-target
    background-color white !important

  .medium
    transform scale(.75)

  .small
    transform scale(.5)

  #explainer-video
    max-width 711px
    max-height 400px
</style>
