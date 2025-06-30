import { redirect } from 'next/navigation';
import Component from '../page';

// This is a server component
export default async function LanguagePage({ params }: { params: Promise<{ lang: string }> }) {
  // Get the language from params
  const content = await params;
  
  // If invalid language, redirect to default language (English)
  if (content.lang !== 'de' && content.lang !== 'en') {
    redirect('/en');
  }
  
  // Render the main component
  return <Component />;
}
