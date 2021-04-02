/**
 * Demo draggable item screen with dynamic add item
 *
 * Kevin Pang April 2021
 */
import React, {useState} from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import DraggableItem from './components/DraggableItem';
import {mdrChibi} from '../../assets';

const DraggableItemPage = () => {
  const [items, setItems] = useState([{x: 0, y: 50, id: '1'}]);

  /**
   * Update item array state when dragging is finished instead of while the item is being dragged to save performance
   * @param x
   * @param y
   * @param id
   */
  const onItemDragEnd = ({x, y, id}: {x: number; y: number; id: string}) => {
    setItems([...items.filter(x => x.id !== id), {x, y, id}]);
  };

  const addItem = () => {
    setItems([...items, {x: 0, y: 50, id: `${items.length + 1}`}]);
  };

  return (
    <View style={styles.container}>
      {items.map(x => (
        <DraggableItem
          id={x.id}
          imageSrc={mdrChibi}
          position={{x: x.x, y: x.y}}
          onDragEnd={onItemDragEnd}
        />
      ))}

      <TouchableOpacity style={styles.addItemButton} onPress={addItem}>
        <Text style={styles.addItemText}>Add item</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  addItemButton: {
    width: '90%',
    borderRadius: 16,
    alignSelf: 'center',
    backgroundColor: 'orange',
    alignItems: 'center',
    padding: 16,
  },
  addItemText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 12,
  },
});

export default DraggableItemPage;
