import React from 'react'

import Image from 'next/image'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { IPostResponse } from '@/services/api/server/Posts'
import { Formatters } from '@/utils/formatters'

export const PostItem = ({ content, title, createdAt }: IPostResponse) => {
  return (
    <div className="flex w-full border border-gray-200 rounded-lg p-5 m-5 gap-3">
      <div className=" flex-col w-full gap-3">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" sizes="sm" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex gap-2 items-center">
            <h3 className="text-lg font-semibold">Shadcn</h3>
            <p className="text-sm text-gray-500">Software Engineer</p>
            <p className="text-sm text-gray-500">{Formatters.formatDate(createdAt)}</p>
          </div>
        </div>

        <div className="flex gap-2 flex-col">
          <h1 className="text-2xl font-semibold">{title}</h1>

          <p className="text-sm text-gray-500 truncate line-clamp-3">{content}</p>
        </div>
      </div>
      <div>
        <Image
          src="https://miro.medium.com/v2/resize:fit:786/format:webp/1*KpQTSQzBqgKl3FQe94qHDg.png"
          width={600}
          height={300}
          alt="content banner"
        />
      </div>
    </div>
  )
}
