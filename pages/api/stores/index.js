import dbConnect from "../../../middleware/mongodb";
import Store from "../../../models/stores"

export default async (req, res) => {
  const { method, body } = req
  const { access_token, context } = body

  await dbConnect()

  switch (method) {
    case 'POST' :
      const store = new Store({
        store_id: body.context,
        access_token: body.access_token,
        user_id: body.user.id,
        user_name: body.user.username,
        user_email: body.user.email
      })


      console.log('store',store)

      const newStore = store.save()
      res.status(201).json(newStore)
      break
    default:
      res.status(400).json({ success: false })
      break
  }

}
