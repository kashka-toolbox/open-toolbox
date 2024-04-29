/**
 * Fetch a URL and return a generator that yields the response body as it is received.
 *
 * @throws Error if there is no body in the response
 */
export async function* streamingFetch( input: RequestInfo | URL, init?: RequestInit ) {

  const response = await fetch(input, init);

  if( !response.body ) throw new Error('No body in response: ' + await response.text());

  const reader  = response.body.getReader();
  const decoder = new TextDecoder('utf-8');

  for( ;; ) {
      const { done, value } = await reader.read()
      if( done ) break;

      try {
          yield decoder.decode(value)
      }
      catch( e:any ) {
          console.warn( e.message )
      }

  }
}