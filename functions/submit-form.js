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
      const age = formData.get('age');
      const positions = formData.get('positions');
      const moderationExperience = formData.get('moderationExperience');
      const whyModerate = formData.get('whyModerate');
      const howHelp = formData.get('howHelp');
      const proof = formData.get('proof');

      // -----------------------------------------------------------------------
      // TO DO:
      // Add your server-side processing logic here:
      // - Validate the form data
      // - Store the data in a database (e.g., Cloudflare D1)
      // - Send an email notification
      // - etc.
      // -----------------------------------------------------------------------

      console.log('Form Data:', {
        firstName,
        lastName,
        age,
        positions,
        moderationExperience,
        whyModerate,
        howHelp,
        proof,
      });

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