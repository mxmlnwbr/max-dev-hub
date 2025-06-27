import { redirect } from 'next/navigation';
import Component from '../page';

export default function LanguagePage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  
  // Validate language parameter
  if (lang !== 'de' && lang !== 'en') {
    // If invalid language, redirect to default language (English)
    redirect('/en');
  }
  
  // Render the main component
  return <Component />;
}
