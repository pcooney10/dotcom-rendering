import React from 'react';
import { getIdFromUrl } from '@root/src/amp/lib/get-video-id';
import { Caption } from '@root/src/amp/components/Caption';

export const VideoYoutube: React.FC<{
    element: VideoYoutube;
    pillar: Pillar;
}> = ({ element, pillar }) => {
    const youtubeId = getIdFromUrl(
        element.url,
        '^[a-zA-Z0-9_-]{11}$', // Alpha numeric, underscores and hyphens, exactly 11 numbers long
        false,
        'v',
    );
    return (
        <Caption captionText={element.caption} pillar={pillar}>
            <amp-youtube
                data-videoid={youtubeId}
                layout="responsive"
                width={element.width}
                height={element.height}
            />
        </Caption>
    );
};
