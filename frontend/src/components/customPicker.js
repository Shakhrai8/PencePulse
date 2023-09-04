import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from 'react-native';

const CustomPicker = ({visible, items, selectedItem, onSelect, onClose}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <ScrollView style={styles.pickerContainer} testID="category-picker">
          {items.map(item => (
            <TouchableOpacity
              key={item.value}
              style={[
                styles.pickerItem,
                item.value === selectedItem.value && styles.selectedItem,
              ]}
              onPress={() => {
                onSelect(item);
                onClose();
              }}>
              <Text>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
          <Text testID="cancel-btn">Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    maxHeight: 250,
  },
  pickerItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedItem: {
    backgroundColor: '#f0f0f0',
  },
  cancelButton: {
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

export default CustomPicker;
