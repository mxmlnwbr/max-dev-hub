import { redirect } from 'next/navigation';
import Component from '../page';

type Props = {
  params: { lang: string }
};

export default async function LanguagePage({ params }: Props) {
  const { lang } = await params;
  
  // Validate language parameter
  if (lang !== 'de' && lang !== 'en') {
    // If invalid language, redirect to default language (English)
    redirect('/en');
  }
  
  // Render the main component
  return <Component />;
}
