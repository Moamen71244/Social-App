import { Button, Card, CardBody } from '@heroui/react'
import axios from 'axios'
import { Bookmark, Earth, Newspaper, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import useFeedOptions from '../../../Hooks/useFeedOptions'

export default function FeedOptions({active,change}) {

    return (
    <Card className="rounded-2xl border border-slate-500 bg-transparent shadow-2xs">
    <CardBody className="p-3 space-y-1">

      <Button
      onPress={function(){
        change("following")
        // refetch()
      }}
        startContent={<Newspaper size={17} />}
        fullWidth
        className={`justify-start gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold transition ${
          active === "following"
            ? "bg-[#e7f3ff] text-blue-700"
            : "text-slate-700 hover:bg-slate-100"
        }`}
        variant="light"
      >
        Feed
      </Button>

      <Button
       onPress={function(){
        change("me")
        // refetch()
      }}
        startContent={<Sparkles size={17} />}
        fullWidth
        variant="light"
        className={`justify-start gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold transition ${
          active === "me"
            ? "bg-[#cce5fe] text-blue-700"
            : "text-slate-700 hover:bg-slate-100"
        }`}
      >
        My Posts
      </Button>

      <Button
            onPress={function(){
                change("all")
                // refetch()
              }}
        startContent={<Earth size={17} />}
        fullWidth
        variant="light"
        className={`justify-start gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold transition ${
          active === "all"
            ? "bg-[#e7f3ff] text-blue-700"
            : "text-slate-700 hover:bg-slate-100"
        }`}
      >
        Community
      </Button>

      <Button
            onPress={function(){
                change("saved")
                // refetch()
              }}
        startContent={<Bookmark size={17} />}
        fullWidth
        variant="light"
        className={`justify-start gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold transition ${
          active === "saved"
            ? "bg-[#e7f3ff] text-blue-700"
            : "text-slate-700 hover:bg-slate-100"
        }`}
      >
        Saved
      </Button>

    </CardBody>
  </Card>
  )
}
