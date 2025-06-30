import { redirect } from 'next/navigation';
import Component from '../page';

// Define the props type for the page component
type Props = {
  params: { lang: string }
}

// This is a server component
export default async function LanguagePage({ params }: Props) {
  // Get the language from params
  const content = await params;
  const lang = content.lang;
  try {
    console.log('Language:', lang);
  } catch (error) {
    console.error('Error fetching params:', error);
    redirect('/en');
  }
  finally {
    // If invalid language, redirect to default language (English)
    if (lang !== 'de' && lang !== 'en') {
      redirect('/en');
    }
  }
  
  // Render the main component
  return <Component />;
}
