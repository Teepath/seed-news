import React, {useEffect, useState} from 'react';
import { TouchableOpacity, ActivityIndicator, StyleSheet} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getUserHandle } from "./action/action"
import NewsCard from './NewsItem';

import {
    Card,
    Title,
  Paragraph,
    List
} from 'react-native-paper';

import {handleStoryIds, handleStory} from "./action/action"


const HomeScreen = ({ navigation }) => {
  const user = useSelector(state => state.userReducer.user);
 
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(20)
  const [start, setStart] = useState(1)
  const [loadAgain, setLoadAgain] = useState(false)

  const ids = useSelector(state => state.News.storyIds);

  
 
  const loadMore = () => {
      setLoadAgain(true)
      setLimit(() => limit + 1)
      setStart(() => start + limit)
      setLoadAgain(false);
}

  useEffect(() => {
    dispatch(getUserHandle(navigation))
    dispatch(handleStoryIds(start, limit))
  }, [])

  return (
    <TouchableOpacity
      onPress={() =>
        navigation?.push('About')
      }
    >
      {!ids ?
        <ActivityIndicator
          style={[styles.centering, styles.gray]}
          color="#ff8179"
          size="large"
        /> :
        <Card>
          <Card.Content>
            <Title>Welcome back {user}!</Title>
            <Paragraph>Here is today's trending news</Paragraph>
          </Card.Content>
          <NewsCard items={ids} loadMore={loadMore} loadAgain={ loadAgain}/>
        </Card>
      }
    
    </TouchableOpacity>
  )
};

var styles = StyleSheet.create({
  container: {
    backgroundColor: "whitesmoke"
  },
  centering: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,

  },
});
  
export default HomeScreen;