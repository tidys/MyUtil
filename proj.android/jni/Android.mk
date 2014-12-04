LOCAL_PATH := $(call my-dir)

include $(CLEAR_VARS)

$(call import-add-path,$(LOCAL_PATH)/../)
$(call import-add-path,$(LOCAL_PATH)/../../cocos2d)
$(call import-add-path,$(LOCAL_PATH)/../../cocos2d/external)
$(call import-add-path,$(LOCAL_PATH)/../../cocos2d/cocos)
$(call import-add-path,$(LOCAL_PATH)/../../cocos2d/extensions)

LOCAL_MODULE := cocos2dcpp_shared

LOCAL_MODULE_FILENAME := libcocos2dcpp

#traverse all the directory and subdirectory
define walk
  $(wildcard $(1)) $(foreach e, $(wildcard $(1)/*), $(call walk, $(e)))
endef

#-----获取class目录下的所有文件-------
ALLFILES = $(call walk, $(LOCAL_PATH)/../../Classes)

FILE_LIST := hellocpp/main.cpp
FILE_LIST += $(filter %.cpp, $(ALLFILES))
FILE_LIST += $(filter %.c, $(ALLFILES))       # sqlite3头文件比较特殊，是。c文件
FILE_INCLUDES := $(filter %.h, $(ALLFILES))

$(info  【FILE_LIST】)
$(info  $(FILE_LIST))
$(info -------------------------------)

$(info  【FILE_INCLUDES】)
$(info  $(FILE_INCLUDES))
$(info -------------------------------)

$(shell echo  $(ALLFILES)>$(LOCAL_PATH)/echo_file)
$(shell echo  $(FILE_LIST) $(FILE_INCLUDES)>$(LOCAL_PATH)/echo_file)

#source file will be compiled
LOCAL_SRC_FILES := $(FILE_LIST:$(LOCAL_PATH)/%=%)

# ------------之前的做法，不推荐--------------
#LOCAL_C_INCLUDES := $(LOCAL_PATH)/../../Classes \
#					$(LOCAL_PATH)/../../Classes/Util \
#					$(LOCAL_PATH)/../../Classes/GameDataObj \

# -------------遍历class的所有目录 -----------
rwildcard=$(wildcard $1$2) $(foreach d,$(wildcard $1*),$(call rwildcard,$d/,$2))
APP_FILES_PATH  :=  $(LOCAL_PATH) \
    $(LOCAL_PATH)/../../Classes  \

APP_ALL_DIRS := $(dir $(foreach src_path,$(APP_FILES_PATH), $(call rwildcard,$(src_path),*/) ) )
APP_ALL_DIRS := $(call uniq,$(APP_ALL_DIRS))

LOCAL_C_INCLUDES := $(APP_ALL_DIRS)

# -------anysdk目录，如果使用打开即可-------
#LOCAL_C_INCLUDES +=	$(LOCAL_PATH)/../protocols/android \
        $(LOCAL_PATH)/../protocols/include

# ------iconv的文件目录---------        
LOCAL_C_INCLUDES += $(LOCAL_PATH)/../../cocos2d/iconv \
                    $(LOCAL_PATH)/../../cocos2d/iconv/include \
                    $(LOCAL_PATH)/../../cocos2d/iconv/srclib \
                    $(LOCAL_PATH)/../../cocos2d/iconv/libcharset \
                    $(LOCAL_PATH)/../../cocos2d/iconv/libcharset/include \
                    $(LOCAL_PATH)/../../cocos2d/iconv/libcharset/lib \
                    
# -------------输出找到的目录 -----------
$(info [**********Find Directory**************])
$(info $(LOCAL_C_INCLUDES))
$(info [**********Find Directory**************])

####################################################################
LOCAL_WHOLE_STATIC_LIBRARIES := cocos2dx_static
LOCAL_WHOLE_STATIC_LIBRARIES += cocosdenshion_static
LOCAL_WHOLE_STATIC_LIBRARIES += box2d_static
LOCAL_WHOLE_STATIC_LIBRARIES += cocos_ui_static
LOCAL_WHOLE_STATIC_LIBRARIES += cocostudio_static
LOCAL_WHOLE_STATIC_LIBRARIES += cocos_extension_static
LOCAL_WHOLE_STATIC_LIBRARIES += cocos_gui_static
LOCAL_WHOLE_STATIC_LIBRARIES += cocos_network_static
LOCAL_WHOLE_STATIC_LIBRARIES += libiconv_static			# 字符集转换库
#LOCAL_WHOLE_STATIC_LIBRARIES += PluginProtocolStatic 	# anysdk lib

include $(BUILD_SHARED_LIBRARY)

$(call import-module,.)
$(call import-module,audio/android)
$(call import-module,extensions)
$(call import-module,editor-support/cocostudio)
$(call import-module,editor-support/cocosbuilder)
$(call import-module,editor-support/spine)
$(call import-module,editor-support/cocostudio)
$(call import-module,network)
$(call import-module,ui)
$(call import-module,iconv)							# 字符集转换，和mk文件中的LOCAL_MODULE_FILENAME相对应，去除lib字段
#$(call import-module,protocols/android)            # anysdk module
