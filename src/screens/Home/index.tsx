import React, { useCallback, useState } from "react";
import { View, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { Appointment, AppointmentProps } from "../../components/Appointment";
import { ButtonAdd } from "../../components/ButtonAdd";
import { CategorySelect } from "../../components/CategorySelect";
import { ListDivider } from "../../components/ListDivider";
import { ListHeader } from "../../components/ListHeader";
import { Profile } from "../../components/Profile";
import { Background } from "../../components/Background";

import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLLECTION_APPOINTMENTS } from "../../configs/database";
import { Load } from "../../components/Load";

export function Home() {
  const navigation = useNavigation();
  const [categorySelected, setCategorySelected] = useState("");
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadAppointments();
    }, [categorySelected])
  );

  function handleCategorySelect(categoryId: string) {
    categoryId === categorySelected
      ? setCategorySelected("")
      : setCategorySelected(categoryId);
  }

  function handleAppointmentDetails(guildSelected: AppointmentProps) {
    navigation.navigate("AppointmentDetails", { guildSelected });
  }

  function handleAppointmentCreate() {
    navigation.navigate("AppointmentCreate");
  }

  async function loadAppointments() {
    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const appointmentsAll: AppointmentProps[] = storage
      ? JSON.parse(storage)
      : [];

    if (categorySelected) {
      setAppointments(
        appointmentsAll.filter((item) => item.category === categorySelected)
      );
    } else {
      setAppointments(appointmentsAll);
    }
    setLoading(false);
  }

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.header}>
          <Profile />
          <ButtonAdd onPress={handleAppointmentCreate} />
        </View>

        <CategorySelect
          categorySelected={categorySelected}
          setCategory={handleCategorySelect}
        />

        {loading ? (
          <Load />
        ) : (
          <>
            <ListHeader title="Partidas agendadas" subtitle={`Total ${appointments.length}`} />

            <FlatList
              data={appointments}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Appointment data={item} onPress={() => handleAppointmentDetails(item)} />
              )}
              ItemSeparatorComponent={() => <ListDivider />}
              contentContainerStyle={{ paddingBottom: 69 }}
              style={styles.matches}
              showsVerticalScrollIndicator={false}
            />
          </>
        )}
      </View>
    </Background>
  );
}
