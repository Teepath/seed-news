import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';;
import { getStory, formatDate } from "./utils/api_data";

import {
    Card,
    Title,
  Paragraph,
} from 'react-native-paper';



const StoryNews = ({ item }) => {
    const [data, setData] = useState({})
    console.log('main data', item)
    //  React.useMemo(() => {
    //     getStory(item).then((res) => {
    //         if (res.by && res.url) {
    //            setData(res)
    //         }
    //     })
             
    //  }, [item])

  
    


    useEffect(() => {
        getStory(item).then(res => {
          setData(res)
      })
    }, [])
   
  
    const { title, by, time, type, url, id } = data;
    const timestamp = formatDate(time)
  
    return (
            <Card>
                <Card.Content>
                    <Title>Title: {title}</Title>
                    <Paragraph>
                        Author: {by?.toUpperCase()}
                    </Paragraph>
                    <Paragraph>
                        Url: {url}
                    </Paragraph>
                    <Paragraph>
                        Type: {type}
                    </Paragraph>
                    <Paragraph>
                        Date:{timestamp}
                    </Paragraph>
                </Card.Content>
      
            </Card>
        
        )
    
    
   
}

export default StoryNews;