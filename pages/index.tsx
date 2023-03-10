import Head from "next/head";
import axios from "axios";
import { Video } from "@/types";
import VideoCard from "@/components/VideoCard";
import NoResult from "@/components/NoResult";
import { BASE_URL } from "@/utils";
// import { Inter } from "@next/font/google";

// const inter = Inter({ subsets: ["latin"] });

interface IProps {
    videos: Video[]
}

export default function Home({ videos }: IProps) {
    // console.log(videos);

    return (
        <>
            <Head>
                <title>TikTok Clone</title>
                <meta name="description" content="TikTok-like application" />
                <meta name="author" content="Okiemute Gold" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex flex-col gap-10 h-full videos">
                {videos.length ? (
                    videos.map((video: Video) => {
                        return (
                            <VideoCard post={video} key={video._id} />
                        )
                    })
                ) : (
                    <NoResult text={"No videos found"} />
                )}
            </main>
        </>
    );
}

export const getServerSideProps = async ({
    query: { topic }
}: {
    query: { topic: string }
}) => {
    let response = null;

    if (topic) {
        // console.log(topic);
        response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
    } else {
        response = await axios.get(`${BASE_URL}/api/post`);
    }

    return {
        props: {
            videos: response.data
        }
    }
}
