import { motion } from 'framer-motion';
import { InfoIcon, Lightbulb } from 'lucide-react';
import { breedContentSources, type BreedContentEntry, type ContentCitation } from '@/data/breed-content';

function ContentSources({ citations }: { citations: ContentCitation[] }) {
  return (
    <span className="inline-flex gap-2 ml-1 text-xs">
      {citations.map(({ source: id, section }) => {
        const source = breedContentSources[id];
        return (
          <a
            key={id}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`${source.title}: ${section}`}
            aria-label={`Source: ${source.title}, ${section}`}
            className="text-amber-700 underline decoration-amber-300 underline-offset-2 hover:text-amber-900 focus-ring rounded-sm"
          >
            {source.label}
          </a>
        );
      })}
    </span>
  );
}

export function BreedEditorialContent({ content }: { content?: BreedContentEntry }) {
  if (!content) return null;

  return (
    <>
      {content.facts.length > 0 && (
        <motion.section
          aria-labelledby="breed-fun-facts"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <InfoIcon className="h-5 w-5 text-amber-600" />
            <h2 id="breed-fun-facts" className="font-display text-xl font-semibold text-foreground">Fun facts</h2>
          </div>
          <ul className="space-y-3">
            {content.facts.map((fact, index) => (
              <li key={fact.id} className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center mt-0.5">
                  <span className="text-amber-800 text-xs font-medium">{index + 1}</span>
                </div>
                <p className="text-muted-foreground">{fact.text} <ContentSources citations={fact.citations} /></p>
              </li>
            ))}
          </ul>
        </motion.section>
      )}
      {content.bondingTips.length > 0 && (
        <motion.section
          aria-labelledby="breed-bonding-tips"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="h-5 w-5 text-amber-600" />
            <h2 id="breed-bonding-tips" className="font-display text-xl font-semibold text-foreground">Bonding tips</h2>
          </div>
          <ul className="space-y-3">
            {content.bondingTips.map(tip => (
              <li key={tip.id} className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center mt-0.5">
                  <Lightbulb className="h-3 w-3 text-amber-800" />
                </div>
                <p className="text-muted-foreground">{tip.text} <ContentSources citations={tip.citations} /></p>
              </li>
            ))}
          </ul>
        </motion.section>
      )}
    </>
  );
}
