export async function onRequest(context) {
  const {
    request, // incoming Request
    env, // environment variables
  } = context;

  if (request.method === 'POST') {
    try {
      const formData = await request.formData();
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
      const { results } = await env.DB.prepare(
        `INSERT INTO applications (firstName, lastName, age, positions, moderationExperience, whyModerate, howHelp, proof) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      )
        .bind(firstName, lastName, age, positions, moderationExperience, whyModerate, howHelp, proof)
        .run();

      console.log('D1 insert results:', results);

      return new Response(
        JSON.stringify({ message: 'Form submitted successfully!' }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } catch (error) {
      console.error('Error processing form:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to process form submission' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  } else {
    return new Response('Method Not Allowed', { status: 405 });
  }
}