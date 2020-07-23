#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <AVFoundation/AVFoundation.h>

#if DEBUG
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>

static void InitializeFlipper(UIApplication *application) {
  FlipperClient *client = [FlipperClient sharedClient];
  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
  [client addPlugin:[FlipperKitReactPlugin new]];
  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
  [client start];
}
#endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  
//  AVAudioSession *audioSession = [AVAudioSession sharedInstance];
//  NSError *setCategoryError = nil;
//  [audioSession setCategory:[AVAudioSessionCategoryPlayback,AVAudioSessionCategoryOptionMixWithOthers]
//                      error:&setCategoryError];
//
//   [audioSession setCategory:AVAudioSessionCategoryOptionMixWithOthers
//                        error:&setCategoryError
//   ];
  
  
  @try {
    [[AVAudioSession sharedInstance]
       setCategory:AVAudioSessionCategoryPlayback
//     withOptions:AVAudioSessionCategoryOptionMixWithOthers error:nil];
     withOptions:AVAudioSessionCategoryOptionDuckOthers error:nil];
     [[AVAudioSession sharedInstance]
      setActive:YES error:nil] ;
  } @catch (NSException *exception) {
    
  } @finally {
    
  }
  [[UIApplication sharedApplication] beginReceivingRemoteControlEvents];
  
  
  
//
//    let audioSession = AVAudioSession.sharedInstance()
//    _ = try? audioSession.setCategory([.playback,.mixWithOthers], options: .defaultToSpeaker)
//    _ = try? audioSession.setActive(true)
  
  
#if DEBUG
  InitializeFlipper(application);
#endif

  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"demoApp"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
