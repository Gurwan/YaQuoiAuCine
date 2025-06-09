<div class="my-4 mx-auto max-w-xl rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
	<h2 class="mb-6 text-2xl font-semibold text-gray-800 dark:text-white">Contactez-nous</h2>

	<form action="https://formspree.io/f/xbloeobg" method="POST" class="space-y-5">
		<div>
			<label for="email" class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
				Ton adresse email :
			</label>
			<input
				type="email"
				id="email"
				name="email"
				required
				placeholder="tonadressemail@gmail.com"
				class="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
			/>
		</div>

		<div>
			<label for="message" class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
				Message :
			</label>
			<textarea
				id="message"
				name="message"
				required
				rows="5"
				placeholder="Qu'est-ce que vous voulez nous transmettre ?"
				class="w-full resize-y rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
			></textarea>
		</div>

		<button
			type="submit"
			class="inline-flex items-center rounded-md bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition duration-150 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
		>
			Envoyer
		</button>
	</form>
</div>
