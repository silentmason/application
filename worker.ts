import { D1Database, FetchEvent } from '@cloudflare/workers-types';

export interface Env {
	D1_DB: D1Database;
}

addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(handleRequest(event));
});

async function handleRequest(event: FetchEvent) {
  if (event.request.method === 'POST') {
    try {
      const formData = await event.request.formData();
      const firstName = formData.get('firstName');
      const lastName = formData.get('lastName');
      const age = parseInt(formData.get('age'));
      const positions = formData.get('positions');
      const moderationExperience = formData.get('moderationExperience');
      const whyModerate = formData.get('whyModerate');
      const howHelp = formData.get('howHelp');
      const proof = formData.get('proof');

      if (!firstName || !lastName || isNaN(age) || !positions || !moderationExperience || !whyModerate || !howHelp) {
        return new Response('Missing or invalid form data', { status: 400 });
      }

      // Insert the data into the D1 database
      const { results } = await (event.request as any).D1_DB.prepare(
        `INSERT INTO applications (firstName, lastName, age, positions, moderationExperience, whyModerate, howHelp, proof) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      )
        .bind(firstName, lastName, age, positions, moderationExperience, whyModerate, howHelp, proof)
        .all();

      console.log('D1 insert results:', results);

      return new Response('Form submitted successfully!', { status: 200 });

    } catch (error) {
      console.error('Error submitting form:', error);
      return new Response('Error submitting form', { status: 500 });
    }
  } else {
    return new Response('Method not allowed', { status: 405 });
  }
}