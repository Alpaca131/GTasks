import { MessageBuilder } from '../shared/message'
const messageBuilder = new MessageBuilder()

function getTodoList() {
  return [{"title": "Swimming", "description": "swim in the city pool.", "id": 1411},
    {"title": "Running", "description": "run with dogs", "id": 1422}]
}
AppSideService({
  onInit() {
    messageBuilder.listen(() => {})
    settings.settingsStorage.addListener(
        'change',
        ({ key, newValue, oldValue }) => {
          messageBuilder.call(getTodoList())
        },
    )
    messageBuilder.on('request', (ctx) => {
      const payload = messageBuilder.buf2Json(ctx.request.payload)
      if (payload.method === 'GET_TODO_LIST') {
        ctx.response({
          data: { result: getTodoList() },
        })
      } else if (payload.method === 'MARK_AS_DONE') {
        const { params: { taskId } = {} } = payload
        console.log("task id is " + taskId)

        ctx.response({
          data: { res_code: 200 },
        })
      }
    })
  },
  onRun() {},
  onDestroy() {},
})