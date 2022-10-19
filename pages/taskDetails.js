import {DEVICE_WIDTH} from "./index.style";
const { messageBuilder } = getApp()._options.globalData

Page({
  state: {
    title: 'Task Detail',
  },
  markAsDone(taskId) {
      messageBuilder
          .request({
              method: 'MARK_AS_DONE',
              params: taskId
          })
          .then(({ result }) => {})
          .catch((res) => {})
  },
  onInit(res) {
      const taskDetails = JSON.parse(res)
      const titleText = hmUI.createWidget(hmUI.widget.TEXT, {
          text: taskDetails.title,
          x: px(42),
          y: px(65),
          w: DEVICE_WIDTH - px(42 * 2),
          h: px(50),
          color: 0xffffff,
          text_size: 36,
          align_h: hmUI.align.CENTER_H,
          text_style: hmUI.text_style.WRAP,
      })
      const descriptionTest = hmUI.createWidget(hmUI.widget.TEXT, {
          text: taskDetails.description,
          x: px(30),
          y: px(40),
          w: DEVICE_WIDTH - px(30 * 2),
          h: px(70),
          color: 0xffffff,
          text_size: 30,
          align_h: hmUI.align.CENTER_H,
          text_style: hmUI.text_style.WRAP,
      })
      const markAsDoneButton = hmUI.createWidget(hmUI.widget.BUTTON, {
          text: "完了",
          x: 150,
          y: 300,
          w: 220,
          h: 80,
          radius: 30,
          color: 0x4d76ff,
          click_func: () => {
              this.markAsDone(taskDetails.id)
              hmApp.goBack()
          }
      })
  },
  build() {
  },
  onDestroy() {}
})