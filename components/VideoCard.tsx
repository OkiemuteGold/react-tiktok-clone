import React from 'react'
import { Video } from '@/types'
import { NextPage } from 'next'

interface IProps {
    post: Video
}

const VideoCard: NextPage<IProps> = ({ post }) => {
    console.log(post);

    return (
        <div>

        </div>
    )
}

export default VideoCard
