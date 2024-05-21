import React from 'react'

import Image from 'next/image'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { IPostResponse } from '@/services/api/server/Posts'
import { Formatters } from '@/utils/formatters'

export const PostItem = ({ content, title, createdAt, banner, avatar, job, name }: IPostResponse) => {
  return (
    <div className="flex w-full border border-gray-200 rounded-lg p-5 m-5 gap-3">
      <div className=" flex-col w-full gap-3">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={avatar} sizes="sm" />
            <AvatarFallback>{name}</AvatarFallback>
          </Avatar>

          <div className="flex gap-2 items-center">
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-gray-500">{job}</p>
            <p className="text-sm text-gray-500">{Formatters.formatDate(createdAt)}</p>
          </div>
        </div>

        <div className="flex gap-2 flex-col">
          <h1 className="text-2xl font-semibold">{title}</h1>

          <p className="text-sm text-gray-500 line-clamp-3">{content}</p>
        </div>
      </div>
      <div className="w-80 h-50">
        <Image src={banner} alt="content banner" className="rounded-lg" width={300} height={300} />
      </div>
    </div>
  )
}
