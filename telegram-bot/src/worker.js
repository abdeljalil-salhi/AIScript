/**
 * Default worker for the Telegram bot.
 * This worker will respond to any message with a predefined message.
 * The predefined message will contain a link to the Contact Us form.
 */
export default {
	/**
	 * Fetch method of the worker. This method will be called when a request is made to the worker.
	 * @param {Request} request - The request object.
	 * @param {Env} env - The environment variables.
	 * @param {Context} _ - The context object.
	 * @returns {Promise<Response>} - The response object.
	 */
	async fetch(request, env, _) {
		if (request.method === 'POST') {
			const payload = await request.json();
			if ('message' in payload) {
				const chatId = payload.message.chat.id;
				const user_firstname = String(payload.message.from.first_name);
				const response = `Hello ${user_firstname},\n\nPlease if you have any questions, refer to the Contact Us form.`;
				await this.sendMessage(env, chatId, encodeURIComponent(response));
			}
		}
		return new Response('OK');
	},

	/**
	 * Send a message to a chat.
	 * @param {Env} env - The environment variables.
	 * @param {string} chatId - The chat ID.
	 * @param {string} text - The message text.
	 * @returns {Promise<void>}
	 */
	async sendMessage(env, chatId, text) {
		const url = `https://api.telegram.org/bot${env.API_KEY}/sendMessage?chat_id=${chatId}&text=${text}&reply_markup={"inline_keyboard": [[{"text": "Contact Us", "url": "${env.CONTACT_URL}"}]]}`;
		const data = await fetch(url).then((resp) => resp.json());
	},
};
