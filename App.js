import { StatusBar } from 'expo-status-bar';
import {Text, TextInput, View, TouchableOpacity, Button, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTrash, faXmark, faSquareCheck, faBook, faCheck, faArrowRight, faArrowDown, faRotateRight, faL } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { styles } from './style';


const TaskApp = ({ inputText, 
  HandleChangeText, 
  arrayOfTasks, 
  addingtaskinput, 
  HandleChangeTaskText, 
  AddTasks, 
  visibletext, 
  Seen, 
  CompletedTasks,
  completedtasks,
  UnCompletedTasks,
  Opentocompleted,
  opentocompleted,
  StartEdit,
  Editing,
  startedit,
  longpress,
  LongPress,
  StartEditCompleted,
  checkall,
  EditingCompleted,
  completedornot,
  selectedIndices,
  deleteSelectedIndices,
  selectIndex,
  selectAllIndices,
  selectIndexCompleted,
  selectedIndicescompleted }) => {
  return (
    <View style={styles.container}>
    {longpress ? <View style={styles.header}>
      <View style={styles.noteside}>
          <TouchableOpacity onPress={LongPress}>
              <FontAwesomeIcon icon={faXmark} size={27} color="black" />
          </TouchableOpacity>
      </View>
      <Text style={{fontSize:20,}}>Select Items</Text>
      <View style={styles.todoside}>
          <TouchableOpacity onPress={() => selectAllIndices()}>
              <View style={styles.circle}>
                {checkall ? <FontAwesomeIcon icon={faCheck} /> : null}
              </View>
          </TouchableOpacity>
      </View>
    </View> : null}
    <View style={styles.searchcontainer}>
      <FontAwesomeIcon icon={faSearch} size={15} color="gray" />
      <TextInput 
      value={inputText}
      style={styles.searchbar} 
      placeholder='Search for tasks' 
      onChangeText={HandleChangeText}
      editable={!longpress}
      />
    </View>
    <View style={styles.body}>
    {arrayOfTasks.length === 0 ? (
  <Text>No tasks here yet </Text>
) : (
  <ScrollView style={{paddingTop:10,}}>
    {arrayOfTasks.map((task, index) => (
      <TouchableOpacity onLongPress={longpress ? null : LongPress} onPress={longpress ? () => selectIndexCompleted(index) : () => StartEdit(index)} key={index} >
        <View style={styles.TasksInTheArray}>
        <TouchableOpacity onPress={longpress ? null :() => CompletedTasks(index)}>
        <View style={styles.TasksBox}>
        </View>
        </TouchableOpacity>
        <Text style={styles.TaskAddBar}>{task}</Text>
        {longpress ? <View style={styles.circle}>
          {selectedIndicescompleted.includes(index) ? <FontAwesomeIcon icon={faCheck} /> : null}
        </View> : null}
        </View>
        
      </TouchableOpacity>
    ))}
  </ScrollView>
)}
  {completedtasks.length === 0 ? (
  null
) : (
  <ScrollView style={{paddingTop:10,}}>
    <TouchableOpacity style={{width:350,height:50,}} onPress={Opentocompleted}>
      <Text>Completed <FontAwesomeIcon icon={opentocompleted ? faArrowDown : faArrowRight}/></Text>
    </TouchableOpacity>
    {opentocompleted ? completedtasks.map((task, index) => (
      
      <TouchableOpacity onLongPress={longpress ? null :LongPress} 
      onPress={longpress ? () => selectIndex(index) : () => StartEditCompleted(index)} key={index}>
        <View style={styles.TasksInTheArray}>
        <TouchableOpacity onPress={longpress ? null :() => UnCompletedTasks(index)}>
        <View style={styles.TasksBox}>
          <FontAwesomeIcon icon={faCheck} size={16} color='gray' />
        </View>
        </TouchableOpacity>
        <Text style={styles.TasksProperties} >{task}</Text>
        {longpress ? <View style={styles.circle}>
          {selectedIndices.includes(index) ? <FontAwesomeIcon icon={faCheck} /> : null}
        </View> : null}
        </View>
      </TouchableOpacity>
    )) : null}
  </ScrollView>
)}
      
    </View>
    
    {visibletext ? 
        <View style={styles.AddingThings}>
      <View style={{justifyContent:'space-evenly',
    alignItems:'baseline',}}>

      </View>
        <View style={styles.box}>
          {completedornot ? <FontAwesomeIcon icon={faCheck} /> : null}
      </View>
      <TextInput 
        value={addingtaskinput} 
        onChangeText={HandleChangeTaskText}  
        autoFocus 
        style={styles.TaskAddBar}
        
        placeholder="Write Here To Your Task"/>
      
      <View>
      {completedornot ? <Button disabled={addingtaskinput === ''} title={startedit ? 'Edit' : 'Add'} color="gray" onPress={startedit ? EditingCompleted : AddTasks}></Button> : <Button disabled={addingtaskinput === ''} title={startedit ? 'Edit' : 'Add'} color="gray" onPress={startedit ? Editing : AddTasks}></Button>}
      </View>
      
    </View> : <View style={styles.addfield}>
      {longpress ? <TouchableOpacity onPress={deleteSelectedIndices} style={styles.DeleteField}>
          <FontAwesomeIcon icon={faTrash} size={20} color='gray'/>
          <Text>Delete</Text>
      </TouchableOpacity> : <TouchableOpacity onPress={Seen} style={styles.touchablefield}>
          <Text style={styles.clickable}>
+
          </Text>
      </TouchableOpacity>}
    </View>}
    
    <StatusBar style="auto" />
  </View>
  );
}

export default function App() {
  

  const [inputText, setInputText] = useState('');
  const [addingtaskinput, setAddingTaskInput] = useState('');
  const [visibletext, setVisibleText] = useState(false);
  const [arrayOfTasks, setArrayOfTasks] = useState([]);
  const [completedtasks, setCompletedTasks] = useState([]);
  const [opentocompleted, setOpenToCompleted] = useState([true]);
  const [startedit, setStartEdit] = useState(false);
  const [getindex, setGetIndex] = useState();
  const [longpress, setLongPress] = useState(false);
  const [checkall, setCheckAll] = useState(false);
  const [completedornot, setCompletedOrNot] = useState(false);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [selectedIndicescompleted, setSelectedIndicesCompleted] = useState([]);

  const deleteSelectedIndices = () => {
    setArrayOfTasks(arrayOfTasks.filter((item, index) => !selectedIndices.includes(index)));
    setCompletedTasks(completedtasks.filter((item, index) => !selectedIndices.includes(index)));
    setSelectedIndices([]);
    setSelectedIndicesCompleted([]);
  };

  const selectAllIndices = () => {
    setCheckAll(true);
    const allIndices = arrayOfTasks.map((_, index) => index);
    const allCompletedIndices = completedtasks.map((_, index) => index);
    const selectedIndices = checkall ? [...allIndices, ...allCompletedIndices] : [];
    setSelectedIndices(selectedIndices);
  };

  const selectIndex = (index) => {
    if (selectedIndices.includes(index)) {
      setSelectedIndices(selectedIndices.filter((i) => i !== index));
    } else {
      setSelectedIndices([...selectedIndices, index]);
    }
  };

  const selectIndexCompleted = (index) => {
    if (selectedIndicescompleted.includes(index)) {
      setSelectedIndicesCompleted(selectedIndicescompleted.filter((i) => i !== index));
    } else {
      setSelectedIndicesCompleted([...selectedIndicescompleted, index]);
    }
  };

  const HandleChangeText = (text) => {
    setInputText(text)
  }

  const CheckAll = () => {
    setCheckAll(!checkall)
  }

  const LongPress = () => {
    setLongPress(!longpress)
  }

  const StartEdit = (index) => {
    setGetIndex(index)
    setVisibleText(true)
    setAddingTaskInput(arrayOfTasks[index])
    setStartEdit(true)
    setCompletedOrNot(false)
  }

  const StartEditCompleted = (index) => {
    setGetIndex(index)
    setVisibleText(true)
    setAddingTaskInput(completedtasks[index])
    setStartEdit(true)
    setCompletedOrNot(true)
  }

  const Editing = () => {
    if(addingtaskinput.trim() !== ''){
      arrayOfTasks[getindex] = addingtaskinput
      setAddingTaskInput('')
      setVisibleText(!visibletext);
      setStartEdit(false)
    }
    else{
      setAddingTaskInput('')
      setVisibleText(!visibletext);
      setStartEdit(false)
    }
  }

  const EditingCompleted = () => {
    if(addingtaskinput.trim() !== ''){
      completedtasks[getindex] = addingtaskinput
      setAddingTaskInput('')
      setVisibleText(!visibletext);
      setStartEdit(false)
    }
    else{
      setAddingTaskInput('')
      setVisibleText(!visibletext);
      setStartEdit(false)
    }
  }


  const Opentocompleted = () => {
    setOpenToCompleted(!opentocompleted)
  }
  

  const HandleChangeTaskText = (text) => {
    setAddingTaskInput(text)
  }

  const Seen = () => {
    setVisibleText(!visibletext);
  };

  const UnCompletedTasks = (index) => {
    const updatedArrayOfTasks = [...arrayOfTasks];
    const removedTask = completedtasks[index];
    updatedArrayOfTasks.push(removedTask);
    setArrayOfTasks(updatedArrayOfTasks);
  
    const updatedCompletedTasks = [...completedtasks];
    updatedCompletedTasks.splice(index, 1);
    setCompletedTasks(updatedCompletedTasks);
  };
  
  const CompletedTasks = (index) => {
    const updatedCompletedTasks = [...completedtasks];
    const removedTask = arrayOfTasks[index];
    updatedCompletedTasks.push(removedTask);
    setCompletedTasks(updatedCompletedTasks);
  
    const updatedArrayOfTasks = [...arrayOfTasks];
    updatedArrayOfTasks.splice(index, 1);
    setArrayOfTasks(updatedArrayOfTasks);
  };

  const AddTasks = () => {
    if(addingtaskinput.trim() !== ''){
      setArrayOfTasks([...arrayOfTasks, addingtaskinput])
      setAddingTaskInput('')
      console.log(addingtaskinput)
      console.log(arrayOfTasks)
      setVisibleText(!visibletext);
    }
    else{
      setAddingTaskInput('')
      setVisibleText(!visibletext);
    }
  }

  

  

  



  return (
    <View style={styles.container}>
      
        <TaskApp
          inputText={inputText}
          HandleChangeText={HandleChangeText}
          arrayOfTasks={arrayOfTasks}
          addingtaskinput={addingtaskinput}
          HandleChangeTaskText={HandleChangeTaskText}
          AddTasks={AddTasks}
          visibletext={visibletext}
          Seen={Seen}
          CompletedTasks={CompletedTasks}
          completedtasks={completedtasks}
          UnCompletedTasks={UnCompletedTasks}
          Opentocompleted = {Opentocompleted}
          opentocompleted={opentocompleted}
          StartEdit={StartEdit}
          Editing={Editing}
          startedit={startedit}
          LongPress={LongPress}
          longpress={longpress}
          StartEditCompleted={StartEditCompleted}
          CheckAll={CheckAll}
          checkall={checkall}
          EditingCompleted={EditingCompleted}
          completedornot={completedornot}
          selectedIndices={selectedIndices}
          deleteSelectedIndices={deleteSelectedIndices}
          selectIndex={selectIndex}
          selectAllIndices={selectAllIndices}
          selectIndexCompleted={selectIndexCompleted}
          selectedIndicescompleted={selectedIndicescompleted}
        />
      
    </View>
  );
}


