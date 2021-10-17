import React,{useState} from 'react';
import { FlatList, SwipeableList, ActivityIndicator, View, Tex } from 'react-native';
import Story from "./Story";




const NewsCard = ({ items, loadMore, loadAgain }) => {
  const renderFunction = ({ item }) => {
    console.log(" here is my data", item)
    return (
      <Story item={item} key={item}/>
    )
  }

  const renderFooter = () => {
    if (!loadAgain) return null;

    return (
      <View
        style={{
          position: 'relative',
          width: 100,
          height: 100,
          paddingVertical: 20,
          borderTopWidth: 1,
          marginTop: 10,
          marginBottom: 10,
          borderColor: "pink"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };
  
  if (items.length > 1) {
    return (      
      <FlatList
      data={items}
      keyExtractor={(item)=> item.toString()}
        renderItem={renderFunction}
      onEndReachedThreshold={0.5}
      // onEndReached={loadMore}
        onRefresh={()=> loadMore}
        ListFooterComponent={renderFooter}
      refreshing={loadAgain}  
    />
      )
  } else {
    return (
      <View>
        <Text> Loading....</Text>
      </View>
    )
  }
  
}

export default NewsCard;
