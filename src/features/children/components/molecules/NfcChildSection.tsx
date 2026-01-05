import { colors } from "@/src/lib/colors";
import { childDetailStyle } from "@/src/lib/styles/childDetailStyle";
import { NFCDevice } from "@/src/lib/types";
import { Plus, Wifi } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import NFCDeviceCard from "../NFCDeviceCard";

type Props = {
  linkedNFCDevices: NFCDevice[];
  currentChild: number;
  onNfcModal: (value: boolean) => void;
  onRemoveNfcTag: (currentChild: number, devideId: string) => void;
  onToggleStateNfcTag: (currentChild: number, devideId: string) => void;
};

const NfcChildSection = ({
  linkedNFCDevices,
  currentChild,
  onNfcModal,
}: Props) => {
  const handleRemoveNfcTag = (currentChild: number, deviceId: string) => {};

  const handleToggleNfcTag = (currentChild: number, deviceId: string) => {};

  return (
    <View style={childDetailStyle.nfcSection}>
      <View style={childDetailStyle.sectionHeader}>
        <Text style={childDetailStyle.sectionTitle}>Appareils NFC liés</Text>
        <TouchableOpacity onPress={() => onNfcModal(true)}>
          <Plus size={20} color={colors.blue} />
        </TouchableOpacity>
      </View>

      {currentChild && linkedNFCDevices[currentChild]?.length ? (
        linkedNFCDevices[currentChild].map((device) => (
          <NFCDeviceCard
            key={device.id}
            device={device}
            onRemove={(deviceId) => handleRemoveNfcTag(currentChild, deviceId)}
            onToggleStatus={(deviceId) =>
              handleToggleNfcTag(currentChild, deviceId)
            }
            onSettings={(deviceId) =>
              console.log("Settings for device:", deviceId)
            }
          />
        ))
      ) : (
        <View style={childDetailStyle.noDevicesContainer}>
          <Wifi size={48} color="#9CA3AF" />
          <Text style={childDetailStyle.noDevicesText}>
            Aucun appareil NFC lié
          </Text>
          <Text style={childDetailStyle.noDevicesSubtext}>
            Ajoutez un bracelet ou tag NFC pour faciliter les paiements
          </Text>
          <TouchableOpacity
            style={childDetailStyle.addNFCButton}
            onPress={() => onNfcModal(true)}
          >
            <Text style={childDetailStyle.addNFCButtonText}>
              Ajouter un appareil
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default NfcChildSection;
